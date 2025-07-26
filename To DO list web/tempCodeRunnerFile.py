
@app.route("/add", methods=["POST"])
def add():
    task = request.form["task"]
