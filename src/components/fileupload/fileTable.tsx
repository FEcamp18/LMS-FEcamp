"use client";
import React, { useState, useEffect } from "react";
import { getFile } from "./getFile";
import { getAllFileName } from "./getAllFileName";
import { disableFile } from "./disableFile";
import { useSession } from "next-auth/react";
import { ROLE } from "@prisma/client";
interface FileInfo {
  fileId: number;
  fileTitle: string;
}

const FileTable = ({ subjectId }: { subjectId: string }) => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const { data: session } = useSession();
  const isAuthorizedRole = session?.user?.role === (ROLE.STAFF || ROLE.BOARD);

  const fetchFiles = async () => {
    const data = await getAllFileName(subjectId);
    if (data) setFiles(data);
  };
  useEffect(() => {
    fetchFiles();
  }, [subjectId]);

  const handleDelete = async (fileId: number) => {
    const success = await disableFile(fileId);
    if (success) {
      await fetchFiles();
    } else {
      console.error("Failed to delete file");
    }
  };

  return (
    <table className="min-w-full border-collapse rounded-lg border border-gray-300 shadow-md">
      <thead>
        <tr className="bg-ameri text-white">
          <th className="border border-gray-300 px-4 py-2">Filename</th>
          <th className="border border-gray-300 px-4 py-2">Download</th>
          {isAuthorizedRole && (
            <th className="border border-gray-300 px-4 py-2">Delete</th>
          )}
        </tr>
      </thead>
      <tbody>
        {files.length === 0 ? (
          <tr>
            <td
              className="border border-gray-300 px-4 py-3 text-center text-gray-500"
              colSpan={isAuthorizedRole ? 3 : 2}
            >
              No files available
            </td>
          </tr>
        ) : (
          files.map((file) => (
            <tr key={file.fileId} className="bg-gray-200 even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-3">
                {file.fileTitle}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                <button
                  className="cursor-pointer rounded-md bg-green-500 px-3 py-1 text-white transition-colors duration-200 hover:bg-green-600"
                  onClick={() => getFile(file.fileTitle)}
                >
                  Download
                </button>
              </td>
              {isAuthorizedRole && (
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <button
                    className="cursor-pointer rounded-md bg-red-500 px-3 py-1 text-white transition-colors duration-200 hover:bg-red-600"
                    onClick={() => handleDelete(file.fileId)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default FileTable;
