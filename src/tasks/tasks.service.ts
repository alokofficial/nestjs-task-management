import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = ["Alok"];

  getAllTasks(){
    return this.tasks
  }
}
