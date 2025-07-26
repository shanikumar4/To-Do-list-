# todo.py
tasks = []

def add_task(task_name):
    tasks.append(task_name)

def update_task(old_task, new_task):
    if old_task in tasks:
        index = tasks.index(old_task)
        tasks[index] = new_task

def delete_task(task_name):
    if task_name in tasks:
        tasks.remove(task_name)

def get_tasks():
    return tasks
