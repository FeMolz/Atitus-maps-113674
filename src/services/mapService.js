import axios from 'axios';

const BASE_URL = 'https://api-vehicle-rentals.onrender.com';

// Buscar todos os pontos
export async function getPoints(token) {
  try {
    const response = await axios.get(`${BASE_URL}/ws/point?`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    const points = response.data.map(point => ({
      id: point.id,
      title: point.descricao || point.description || "Sem descrição",
      position: {
        lat: point.latitude || point.lat,
        lng: point.longitude || point.lng,
      },
    }));

    if (response.status === 200) {
      return points;
    } else {
      throw new Error('Erro ao buscar pontos');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar pontos');
  }
}

// Buscar um ponto específico
export async function getPointById(token, id) {
  try {
    const response = await axios.get(`${BASE_URL}/ws/points/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.descricao,
        position: {
          lat: response.data.latitude,
          lng: response.data.longitude,
        },
      };
    } else {
      throw new Error('Erro ao buscar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar ponto');
  }
}

// Criar um novo ponto
export async function postPoint(token, pointData) {
  try {
    const response = await axios.post(`${BASE_URL}/ws/point`, pointData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201 || response.status === 200) {
      return response.data;
    } else {
      throw new Error('Erro ao cadastrar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar ponto');
  }
}

// Atualizar um ponto
export async function updatePoint(token, id, pointData) {
  try {
    const response = await axios.put(`${BASE_URL}/ws/point/${id}`, pointData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Erro ao atualizar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar ponto');
  }
}

// Deletar um ponto
export async function deletePoint(token, id) {
  try {
    const response = await axios.delete(`${BASE_URL}/ws/point/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204 || response.status === 200) {
      return;
    } else {
      throw new Error('Erro ao deletar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao deletar ponto');
  }
}