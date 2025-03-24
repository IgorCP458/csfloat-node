const Item = require("./item.model"); // Modelo do banco de dados

// Função para buscar dados de uma API externa
const updateDatabase = async (req, res) => {
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
    
    dados.data.forEach(async listing => {
       const listingOnDB = await Item.findOne({where: {itemID: listing.id}})
       if(listingOnDB === null) {
        const item = listing.item
        try {
          Item.create({
            itemID: listing.id,
            price: listing.price, 
            item: {
              icon_url: item.icon_url,
              market_hash_name: item.market_hash_name,
              inspect_link: item.inspect_link,
              type: item.type,
              rarity_name: item.rarity_name,
              wear_name: item.wear_name,
              is_stattrak: item.is_stattrak,
              is_souvenir: item.is_souvenir,
            } 
          })
          count += 1
        } catch (error) {
        }
      }
    });
    res.json({msg: "Itens cadastrados!"})

} catch (erro) {
    console.error("Erro ao buscar dados:", erro);
    res.status(500).json({ erro: erro.message || 'Erro ao buscar dados' });
}
};

// Buscar todos os itens do banco de dados
const getItems = async (req, res) => {
  try {
    const itens = await Item.findAll();
    res.json({data: itens});
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os itens" });
  }
};

module.exports = { updateDatabase, getItems };
