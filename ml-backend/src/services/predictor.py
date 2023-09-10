import json
import yaml
import joblib
import numpy as np
from fastapi import HTTPException
from src.interface.payload import Payload
from src.interface.response import Results
from datetime import datetime
from datetime import date


class Predict:

    def __init__(self, cfg_filepath):
        self._cfg = None

        with open(cfg_filepath, "r") as ymlfile:
            self._cfg = yaml.safe_load(ymlfile)

            self.scaler_mod = self._cfg['category-enc']['pkl_path']
            self.pca_mod = self._cfg['dimensionality-reduction']['pkl_path']
            self.kmeans_mod = self._cfg['k_means-clustering']['joblib_path']

    def process(self, payload: Payload):
       if payload is None:
            raise HTTPException(status_code=422, detail="Request payload is empty")
       
       payload_obj = json.loads(payload)
       
       new_age , new_cost = self.process_quatitative_data(payload_obj['installation_date'],payload_obj['cost'])
       user_input = [new_cost, \
                new_age, \
                1 if not payload_obj['warrenty'] else 0, \
                1 if payload_obj['warrenty'] else 0, \
                1 if payload_obj['functional'] == 0 else 0, \
                1 if payload_obj['functional'] == 2 else 0, \
                1 if payload_obj['functional'] == 1 else 0, \
                1 if payload_obj['status'] else 0, \
                1 if not payload_obj['status'] else 0]
       
       callback = Results(serial_num=payload_obj['serial_number'],cluster_num=self.run(user_input))
       return callback
        
        
    def process_quatitative_data(self, date_string, cost) -> float:
       date_format = "%d/%m/%Y"    
       date_ = datetime.strptime(date_string, date_format).date().year
       return self.run_standard_scaling([date.today().year - date_ , cost])

    def run_standard_scaling(self, numerics: list):
        loaded_scaler = joblib.load(self.scaler_mod)
        scaled_new_data = loaded_scaler.transform(np.array([numerics]))[0]  # Replace 'new_data' with your new data
        return scaled_new_data[0] , scaled_new_data[1]
    
    def run_pca(self, data):
        pca_reload = joblib.load(open(self.pca_mod,'rb'))
        result = pca_reload.transform(np.array([data]))
        return result
    
    def run_kmeans(self, dim_data):
        loaded_kmeans = joblib.load(self.kmeans_mod)
        cluster_res = loaded_kmeans.predict(dim_data)[0]
        return cluster_res
    
    def run(self, scaled_data):
        pca_res = self.run_pca(scaled_data)
        res = self.run_kmeans(pca_res)
        return res

    
    