import express from 'express'
import {
  createTransaction,
  deleteTransaction,
  getAllTransaction,
  getMonthlySummary,
  UpdateTransaction
} from '../controllers/transController.js'
import { protect } from '../middlewares/auth.js'
import { validate } from '../middlewares/validateZod.js'
import { createTransactionSchema } from '../Schema/TransactionSchema.js'

const router = express.Router()

/**
 * @swagger
 * /transactions/get:
 *   get:
 *     summary: Get all transactions for logged in user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/get', protect, getAllTransaction)

/**
 * @swagger
 * /transactions/summary:
 *   get:
 *     summary: Get monthly income, expense, and net balance
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly summary
 */
router.get('/summary', protect, getMonthlySummary)

/**
 * @swagger
 * /transactions/create:
 *   post:
 *     summary: Create new transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Salary
 *               amount:
 *                 type: number
 *                 example: 500
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: income
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-01
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post('/create', protect, validate(createTransactionSchema), createTransaction)

/**
 * @swagger
 * /transactions/update/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.put('/update/:id', protect, UpdateTransaction)

/**
 * @swagger
 * /transactions/delete/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete('/delete/:id', protect, deleteTransaction)

export default router