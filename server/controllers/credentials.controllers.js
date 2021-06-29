import bcrypt from 'bcryptjs';
import { json } from 'express';
import { validationResult } from 'express-validator';

import Credentials from '../models/credentials.model.js';
import User from '../models/user.models.js';

export const addItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid Data'
      });
    }

    const { email, password, name, type } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    // TODO: Что тут с паролем делать?
    const credentials = new Credentials({
      name,
      email,
      password: hashedPassword,
      type
    });

    req.user.credentials.push(credentials);

    await req.user.save();

    res.json({
      message: 'New credentials added',
      credentials
    });
  } catch (error) {
    res.status(500).json({
      message: 'Wasn\'t able to create new credentials, try again later...',
      error
    });
  }
};

export const getCredentials = async (req, res) => {
  try {
    const data = req.user.credentials;
    res.json({
      data
    });
  } catch (error) {
    res.status(500).json({
      message: 'Wasn\'t able to get data, try again later...',
      error
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    await req.user.credentials.id(id).remove();
    await req.user.save();

    res.json({
      message: 'Item was deleted',
      itemId: id
    });
  } catch (error) {
    res.status(500).json({
      message: 'Wasn\'t able to delete this item, try again later...',
      error
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await req.user.credentials.id(id);

    res.json({
      item
    });
  } catch (error) {
    res.status(500).json({
      message: 'Wasn\'t able to get data form this item, try again later...',
      error
    });
  }
};

export const editItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid Data'
      });
    }

    const { id } = req.params;

    let item = await req.user.credentials.id(id);

    if (!item) {
      return res.status(400).json({
        message: 'Invalid item id'
      });
    }

    item = item.set(req.body);
    await req.user.save();

    res.json({
      message: 'Updated successfully',
      item
    });
  } catch (error) {
    res.status(500).json({
      message: 'Wasn\'t able to edit, try again later...',
      error
    });
  }
};
