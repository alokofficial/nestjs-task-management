import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const {status, search} = filterDto

    // define a temporary array to hold the result
    let task = this.getAllTasks();

    // do something with status
    if(status){
      task = task.filter((task) => task.status === status)
    }

    // do something with search
    if(search){
      task = task.filter((task)=>{
        if(task.title.includes(search) || task.description.includes(search)){
          return true
        }
        return false
      })
    }

    // return final result
    return task
  }
  getTaskById(id: string): Task {

    // try to get task
    const found =  this.tasks.find((task) => task.id === id);

    // if not found, throw an error (404 Not Found!)
    if(!found){
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
    //otherwise, return the found task
    return found
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task)=> task.id !==id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task|undefined {
    const task = this.getTaskById(id);
    if(!task) return undefined
    task.status = status
    return task
  }

  createTask(createTaskDto: CreateTaskDto):Task{
    const {title, description} = createTaskDto
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task);
    return task;
  }
}
