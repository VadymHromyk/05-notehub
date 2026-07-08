import axios from "axios";
import type { Note } from "../types/note";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNoteResponse {
  note: Note;
}

export type CreateNote = Pick<Note, "title" | "content" | "tag">;

const urlNote = "https://notehub-public.goit.study/api/notes";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${myKey}`,
};

export const fetchNotes = async (
  query?: string,
  page?: number,
  perPage?: number,
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>(urlNote, {
    params: {
      search: query,
      page,
      perPage,
    },
    headers,
  });

  return data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await axios.post<FetchNoteResponse>(urlNote, newNote, {
    headers,
  });

  return data.note;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<FetchNoteResponse>(`${urlNote}/${noteId}`, {
    headers,
  });

  return res.data.note;
};
