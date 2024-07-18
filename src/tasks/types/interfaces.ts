
export interface TaskFilters {
    status?: string;
    project?: string;
    createdAt?: { $gte: Date };
  }

 export interface Filters {
    status?: string;
    project?: string;
    createdAt?: { $gte: Date };
  }
