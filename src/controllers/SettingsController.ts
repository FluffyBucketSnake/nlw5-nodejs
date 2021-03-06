import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';

import { SettingsRepository } from '../repositories/SettingsRepository';
import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.create({ chat, username });

      return response.json(settings);
    } catch (e) {
      return response.status(400).json({
        message: e.message,
      })
    }
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const service = new SettingsService();

    const settings = await service.findByUsername(username);

    return response.json(settings);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;

    const service = new SettingsService();

    const settings = await service.update(username, chat);

    return response.json(settings);
  }
}

export { SettingsController }