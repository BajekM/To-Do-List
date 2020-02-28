import React from 'react';
import io from 'socket.io-client';

const tasks = [];

class App extends React.Component {

  state = {
    taskName: '',
    tasks: [],
  }

  componentDidMount() {
    this.socket = io('localhost:8000');
    this.socket.on('addTask', (taskName) => this.addTask(taskName));
    this.socket.on('removeTask', (taskId) => this.removeTask(taskId));
    this.socket.on('updateData', (tasks) =>this.updateTaks(tasks));
  }

  removeTask(id, condition = false) {
    tasks.splice(id, 1);
    if (condition) {
      console.log('true');
      this.socket.emit('removeTask', id)
    }
    console.log(tasks)
    this.setState({tasks: tasks})
  }

  submitForm(e) {
    e.preventDefault();
    this.addTask(this.state.taskName);
    this.socket.emit('addTask', this.state.taskName);
  }

  addTask(task) {
    tasks.push(task);
    console.log(tasks);
    this.setState({tasks: tasks})
  }

  updateTaks(taskArray) {
    this.setState({tasks: taskArray});
  }

  render() {
    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {/* <li class="task">Shopping <button class="btn btn--red">Remove</button></li>
            <li class="task">Go out with a dog <button class="btn btn--red">Remove</button></li> */}
            {this.state.tasks.map((task) => 
              <li key={task} className="task">{task} <button className="btn btn--red" onClick={() => this.removeTask(this.state.tasks.indexOf(task), true)}>Remove</button></li>
            )}
          </ul>
    
          <form id="add-task-form" onSubmit={(e) => this.submitForm(e)}>
            <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" 
            value={this.state.taskName} 
            onChange={(e) => {
              this.setState({
                taskName: e.target.value,
              })
            }}
            />
            <button className="btn" type="submit">Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;