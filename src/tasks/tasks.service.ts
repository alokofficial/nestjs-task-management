import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {
    
  }

  // getAllTasks(): Task[] {
  //   return this.tasks
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const {status, search} = filterDto

  //   // define a temporary array to hold the result
  //   let task = this.getAllTasks();

  //   // do something with status
  //   if(status){
  //     task = task.filter((task) => task.status === status)
  //   }

  //   // do something with search
  //   if(search){
  //     task = task.filter((task)=>{
  //       if(task.title.includes(search) || task.description.includes(search)){
  //         return true
  //       }
  //       return false
  //     })
  //   }

  //   // return final result
  //   return task
  // }
  async getTaskById(id: string|any): Promise<Task>{
    const found = await this.tasksRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
    return found
  }

  // getTaskById(id: string): Task {

  //   // try to get task
  //   const found =  this.tasks.find((task) => task.id === id);

  //   // if not found, throw an error (404 Not Found!)
  //   if(!found){
  //     throw new NotFoundException(`Task with ID "${id}" not found`)
  //   }
  //   //otherwise, return the found task
  //   return found
  // }

  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   // if(!found){
  //   //   throw new NotFoundException(`Task with ID "${id}" not found`)
  //   // }
  //   this.tasks = this.tasks.filter((task)=> task.id !==found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task|undefined {
  //   const task = this.getTaskById(id);
  //   if(!task) return undefined
  //   task.status = status
  //   return task
  // }

  // createTask(createTaskDto: CreateTaskDto):Task{
  //   const {title, description} = createTaskDto
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   }
  //   this.tasks.push(task);
  //   return task;
  // }
}
