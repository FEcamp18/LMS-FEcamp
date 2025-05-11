"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { getFile } from "./getFile";
import { getAllFileName } from "./getAllFileName";
import { disableFile } from "./disableFile";
import { usePathname } from "next/navigation";

interface FileInfo {
  fileId: number;
  fileTitle: string;
}

export interface FileTableRef {
  fetchFiles: () => Promise<void>;
}

const FileTable = forwardRef<FileTableRef, { subjectId: string }>(
  ({ subjectId }, ref) => {
    const [files, setFiles] = useState<FileInfo[]>([]);
    const pathname = usePathname();

    const isTutorPath = pathname?.startsWith("/tutor/");
    const showDeleteButton = isTutorPath;

    const fetchFiles = async () => {
      const data = await getAllFileName(subjectId);
      if (data) setFiles(data);
    };

    useImperativeHandle(ref, () => ({
      fetchFiles,
    }));

    useEffect(() => {
      void fetchFiles();
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
            {showDeleteButton && (
              <th className="border border-gray-300 px-4 py-2">Delete</th>
            )}
          </tr>
        </thead>
        <tbody>
          {files.length === 0 ? (
            <tr>
              <td
                className="border border-gray-300 px-4 py-3 text-center text-gray-500"
                colSpan={showDeleteButton ? 3 : 2}
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
                {showDeleteButton && (
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
  },
);

FileTable.displayName = "FileTable";

export default FileTable;
