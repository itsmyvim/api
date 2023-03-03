import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { PluginService } from './plugin.service';
import { UpdatePluginsDTO } from '../utils/interface';

@Controller('plugin')
export class PluginController {
  constructor(private pluginService: PluginService) {}

  @Post('update')
  async updatePlugins(
    @Body() updatePluginsDto: UpdatePluginsDTO,
  ): Promise<User> {
    const pluginsUser = await this.pluginService.updatePlugins(
      updatePluginsDto,
    );
    console.log('UPDATED');
    return pluginsUser;
  }
}
