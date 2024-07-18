import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilters } from './types/interfaces';



@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(filters: TaskFilters, page: number, limit: number): Promise<Task[]> {
    const skip = (page - 1) * limit;
    const query = this.taskModel.find(this.buildQuery(filters)).skip(skip).limit(limit);
    return query.exec();
  }

  async countAll(filters: TaskFilters): Promise<number> {
    const query = this.taskModel.countDocuments(this.buildQuery(filters));
    return query.exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  private buildQuery(filters: TaskFilters): FilterQuery<Task> {
    const query: FilterQuery<Task> = {};
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.project) {
      query.project = filters.project;
    }
    if (filters.createdAt) {
      query.createdAt = filters.createdAt;
    }
    return query;
  }
}