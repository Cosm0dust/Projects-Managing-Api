
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Filters } from './types/interfaces';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tasks')
@Controller('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.', type: Task })
  @ApiBody({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of task list.'})
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'project', required: false, type: String })
  @ApiQuery({ name: 'createdAt', required: false, type: String })
  async findAll(
    @Query('status') status: string,
    @Query('project') project: string,
    @Query('createdAt') createdAt: string,
  ) {
    const filters: Filters = {};
    if (status) filters.status = status;
    if (project) filters.project = project;
    if (createdAt) filters.createdAt = { $gte: new Date(createdAt) };

    const page = 1; // Example: Replace with actual pagination logic
    const limit = 10;

    const tasks = await this.tasksService.findAll(filters, page, limit);
    const total = await this.tasksService.countAll(filters);

    return { tasks, total, page, limit };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task found.', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the task', example: '123' })
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({ status: 200, description: 'Task updated successfully.', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the task', example: '123' })
  @ApiBody({ type: UpdateTaskDto })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the task', example: '123' })
  async remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}