import { deleteHistoryService } from "@/services/history/deleteHistory.services";
import { getAllHistoryService } from "@/services/history/getAllHistory.services";
import { postHistoryService } from "@/services/history/postHistory.services";
import { putHistoryService } from "@/services/history/putHistory.services";
import { Request, Response } from "express";

export const getAllHistoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const historys = await getAllHistoryService();
    return res.status(201).json(historys);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};
export const postHistoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const createHistory = await postHistoryService(req.body);
    return res.status(201).json(createHistory);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};

export const putHistoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const historyEdit = await putHistoryService(id, req.body);
    return res.status(201).json(historyEdit);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};
export const deleteHistoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await deleteHistoryService(req.params.id);
    return res.status(204).send();
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};
