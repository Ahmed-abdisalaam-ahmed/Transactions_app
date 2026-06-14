import Transaction from "../modules/Transaction.js";

export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};
export const getAllTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ createdBy: req.user._id });
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};
export const getMonthlySummary = async (req, res, next) => {
  try {
    const now = new Date();
    // Bilowga bisha (April 1, 2026)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // Bilowga bisha xigta (May 1, 2026)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const transactions = await Transaction.aggregate([
      { $match: { createdBy: req.user._id } },
      {
        $match: {
          // Kaliya xogta bishan (April 2026)
          dueDate: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalIncome: 1,
          totalExpense: 1,
          netBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
        },
      },
    ]);

    if(transactions.length === 0){
      return res.status(200).json({totalIncome: 0, totalExpense: 0, netBalance:0})
    }
    res.status(200).json(transactions[0]);
  } catch (err) {
    next(err);
  }
};

export const UpdateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true },
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction not Found" });
    res.json(transaction);
  } catch (err) {
    next(err);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!transaction)
      return res.status(404).json({ message: "Transaction not Found" });
    res.json({ message: "Transaction deleted", transaction });
  } catch (err) {
    next(err);
  }
};
