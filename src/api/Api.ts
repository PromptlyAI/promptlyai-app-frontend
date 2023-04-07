import React from "react";

interface IProps {
  path: string;
  method: string;
  bodyParams?: any;
  token?: string;
}

export default async function Api({ path, method, bodyParams, token }: IProps) {
  const response = await fetch(`http://localhost:5000/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization-token": token ? token : "",
    },
    body: bodyParams && JSON.stringify(bodyParams),
  });
  try {
    return await response.json();
  } catch (err) {
    return response;
  }
}
