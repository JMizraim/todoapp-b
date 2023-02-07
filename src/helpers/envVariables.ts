export const getURI = (): string => {
  const URI: string = process.env.URI || '';
  if (!URI) throw new Error('No se encontró URI en .env');
  return URI;
};

export const getDbName = (): string => {
  const dbName: string = process.env.DB_NAME || '';
  if (!dbName) throw new Error('No se encontró DB_NAME en .env');
  return dbName;
};

export const getSecretKey = (): string => {
  const secretKey: string = process.env.SECRET_KEY || '';
  if (!secretKey) throw new Error('No se encontró SECRET_KEY en .env');
  return secretKey;
};

export const getPORT = (): string => {
  const PORT: string = process.env.PORT || '';
  if (!PORT) throw new Error('No se encontro PORT en .env');
  return PORT;
};
