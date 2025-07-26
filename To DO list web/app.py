from flask import Flask, render_template, request, redirect
import todo

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", tasks=todo.get_tasks())

@app.route("/add", methods=["POST"])
def add():
    task = request.form["task"]
    todo.add_task(task)
    return redirect("/")

@app.route("/delete", methods=["POST"])
def delete():
    task = request.form["task"]
    todo.delete_task(task)
    return redirect("/")

@app.route("/update", methods=["POST"])
def update():
    old = request.form["old_task"]
    new = request.form["new_task"]
    todo.update_task(old, new)
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
