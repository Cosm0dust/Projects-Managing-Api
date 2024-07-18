// projects.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Project[]> {
    const skip = (page - 1) * limit;
    return this.projectModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectModel.findById(id).populate('tasks').exec();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}