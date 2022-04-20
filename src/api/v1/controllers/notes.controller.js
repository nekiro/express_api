import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import prisma from '../../../database';

export default {
  create: async (req, res, next) => {
    try {
      const { title, message } = req.query;

      const note = await prisma.notes.create({
        data: { title, message },
      });

      res.send(note);
    } catch (err) {
      next(err);
    }
  },

  get: async (_req, res, next) => {
    try {
      const notes = await prisma.notes.findMany();
      res.send({ count: notes.length, results: notes });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);

      const note = await prisma.notes.findUnique({
        where: {
          id,
        },
      });

      if (!note) {
        return next(
          new PrismaClientKnownRequestError('Element does not exist')
        );
      }

      res.send(note);
    } catch (err) {
      next(err);
    }
  },

  updateById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);

      const { title, message } = req.query;

      const note = await prisma.notes.update({
        where: {
          id,
        },
        data: {
          title,
          message,
        },
      });

      res.send(note);
    } catch (err) {
      next(err);
    }
  },

  deleteById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);

      await prisma.notes.delete({
        where: {
          id,
        },
      });

      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },

  ping: async (req, res) => {
    res.send({ pong: true });
  },
};
