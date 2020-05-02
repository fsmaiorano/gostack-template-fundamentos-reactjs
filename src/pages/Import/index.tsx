import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    try {
      uploadedFiles.map(
        async (upload: FileProps): Promise<void> => {
          const formData = new FormData();
          formData.append('file', upload.file);
          const response = await api.post('/transactions/import', formData);
        },
      );
    } catch (err) {
      console.log(err.response.error);
    }
    history.goBack();
  }

  function submitFile(files: File[]): void {
    if (files.length > 0) {
      setUploadedFiles([
        ...uploadedFiles,
        {
          file: files[0],
          name: files[0].name,
          readableSize: files[0].size.toString(),
        },
      ]);
    }
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
