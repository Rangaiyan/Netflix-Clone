import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  @Get('dashboard')
  getAdminDashboard() {
    return { message: 'Welcome to the admin panel' };
  }
}
