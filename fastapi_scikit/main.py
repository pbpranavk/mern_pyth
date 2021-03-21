from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from keras.models import model_from_json
from typing import Dict, Any

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/testing/")
async def posttesting(x: Dict[Any, Any] = None):
    print(x)
    return {"Hello": "World"}


@app.post("/diabetes/")
async def get_diabetes(tests: Dict[Any, Any] = None):
    json_file = open("./notebooks/model.json", "r")
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)

    # load weights into new model
    loaded_model.load_weights("./notebooks/model.h5")
    print("Loaded model from disk")

    # evaluate loaded model on test data
    loaded_model.compile(
        loss="binary_crossentropy", optimizer="rmsprop", metrics=["accuracy"]
    )
    # score = loaded_model.evaluate(X, Y, verbose=0)
    # print("%s: %.2f%%" % (loaded_model.metrics_names[1], score[1] * 100))

    prediction = loaded_model.predict(
        np.array(
            [
                tests["values"],
            ]
        )
    )
    predictionlist = prediction.tolist()
    predictionvalue = predictionlist[0][0]
    return {"prediction": predictionvalue}
