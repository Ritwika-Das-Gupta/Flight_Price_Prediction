# python flask server creation
from flask import Flask
from flask_cors import CORS
from flask import Flask, request,jsonify
import util
app=Flask(__name__)
CORS(app)
# runnng the server and calling /hello function which returns hi
@app.route('/get_airline')
#'airline', 'source_city', 'departure_time', 'stops', 'arrival_time',
# 'destination_city', 'class', 'duration', 'days_left', 'price'
# def get_source_city():
def get_airline():
    response=jsonify({
        'airline':util.get_airline()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
# def get_source_city():
# def get_source_city():


@app.route("/get_source")
def get_source():
    response=jsonify({
        "source":util.get_source()
    })
    response.headers.add("Access-Control_Allow_Origin","*")
    return response

@app.route("/get_dep")
def get_dep():
    response=jsonify({
        "departure":util.get_dep()
    })
    response.headers.add("Access-Control_Allow_Origin","*")
    return response

@app.route("/get_stops")
def get_stops():
    response=jsonify({
        "stops":util.get_stops()
    })
    response.headers.add("Access-Control_Allow_Origin","*")
    return response

@app.route("/get_arri")
def get_arri():
    response=jsonify({
        "arrival":util.get_arri()
    })
    response.headers.add("Access-Control_Allow_Origin","*")
    return response

@app.route("/get_des")
def get_des():
    response=jsonify({
        "destination":util.get_des()
    })
    response.headers.add("Access-Control_Allow_Origin","*")
    return response

@app.route("/get_cls")
def get_cls():
    response=jsonify({
        "class":util.get_cls()
    })
    response.headers.add("Access-Control_Allow_Origin","*")
    return response

@app.route("/predict_price",methods=['POST'])
def predict_price():
    days_left=int(request.form['days_left'])
    airline= request.form['airline']
    source_city=request.form['source_city']
    departure_time=request.form['departure_time']
    stops=request.form['stops']
    arrival_time=request.form['arrival_time']
    destination_city=request.form['destination_city']
    classes=request.form['class']
    arr=[airline,source_city,departure_time,stops,arrival_time,destination_city,classes]
    response = jsonify({
        "predicted_price": util.predict_price(arr,days_left)
    })
    response.headers.add('Acess-Control-Allow-Origin','*')
    return response
    pass
def hello():
    return "Hi"
if __name__=="__main__":
    print("Starting Python flask")
    util.load_saved_artifacts()
    app.run()