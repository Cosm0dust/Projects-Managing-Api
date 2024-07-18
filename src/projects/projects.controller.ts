import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('projects')
@Controller('projects')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of project list.', type: [Project] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page', ParseIntPipe) page: number = 1, @Query('limit', ParseIntPipe) limit: number = 10): Promise<Project[]> {
    const projects = await this.projectsService.findAll(page, limit);
    return projects
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiResponse({ status: 200, description: 'Project found.', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the project', example: '123' })
  async findOne(@Param('id') id: string): Promise<Project> {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully.', type: Project })
  @ApiBody({ type: CreateProjectDto })
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = await this.projectsService.create(createProjectDto);
    return createdProject;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully.', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the project', example: '123' })
  @ApiBody({ type: UpdateProjectDto })
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    const updatedProject = await this.projectsService.update(id, updateProjectDto);
    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }
    return updatedProject;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully.', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the project', example: '123' })
  async remove(@Param('id') id: string): Promise<Project> {
    const deletedProject = await this.projectsService.delete(id);
    if (!deletedProject) {
      throw new NotFoundException('Project not found');
    }
    return deletedProject;
  }
}
