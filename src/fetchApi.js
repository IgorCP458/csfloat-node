// Rota principal para buscar dados
app.post('/csfloat', async (req, res) => {
    try {
        const { search_params } = req.body; // Captura os parâmetros do JSON enviado
        console.log("Parâmetros recebidos:", search_params);

        if (!search_params || typeof search_params !== 'object') {
            return res.status(400).json({ erro: 'Parâmetros inválidos' });
        }

        const url = new URL('https://csfloat.com/api/v1/listings');

        if(search_params.sort_by) {
            url.searchParams.append('sort_by', search_params.sort_by);
        }
        if(search_params.min_price) {
            url.searchParams.append('min_price', search_params.min_price);
        }
        if(search_params.max_price) {
            url.searchParams.append('max_price', search_params.max_price);
        }

        console.log("URL gerada:", url.toString());

        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `${process.env.CSFLOAT_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        res.json(dados);

    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        res.status(500).json({ erro: erro.message || 'Erro ao buscar dados' });
    }
});

async function fetchData() {
  const queryParams = {
    "search_params": {
      "sort_by": "most_recent",
      "min_price": 4000,
      "limit": 100
    }
  }
  
  try {
    console.log("sucesso")
  } catch (erro) {
    console.error("Erro ao buscar dados:", erro);
    res.status(500).json({ erro: erro.message || 'Erro ao buscar dados' });
  }
}