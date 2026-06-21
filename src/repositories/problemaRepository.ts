import { SQLiteDatabase } from "expo-sqlite";
import { Problema } from "../types/problema";

export async function listarProblemas(db: SQLiteDatabase): Promise<Problema[]> {
  const resultado = await db.getAllAsync<Problema>(
    "SELECT * FROM problemas ORDER BY id DESC;",
  );
  return resultado;
}

export async function inserirProblema(
  db: SQLiteDatabase,
  problema: Omit<Problema, "id">,
): Promise<void> {
  await db.runAsync(
    "INSERT INTO problemas (titulo, descricao, fotoUri, latitude, longitude) VALUES (?, ?, ?, ?, ?);",
    [
      problema.titulo,
      problema.descricao,
      problema.fotoUri,
      problema.latitude,
      problema.longitude,
    ],
  );
}

export async function excluirProblema(
  db: SQLiteDatabase,
  id: number,
): Promise<void> {
  await db.runAsync("DELETE FROM problemas WHERE id = ?;", [id]);
}

export async function atualizarProblema(
  db: SQLiteDatabase,
  id: number,
  problema: Omit<Problema, "id">,
): Promise<void> {
  await db.runAsync(
    `UPDATE problemas 
     SET titulo = ?, descricao = ?, fotoUri = ?, latitude = ?, longitude = ? 
     WHERE id = ?;`,
    [
      problema.titulo,
      problema.descricao,
      problema.fotoUri,
      problema.latitude,
      problema.longitude,
      id,
    ],
  );
}
