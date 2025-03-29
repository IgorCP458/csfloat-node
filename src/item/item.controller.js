const Item = require("./item.model"); // Modelo do banco de dados

// Função para buscar dados de uma API externa
const updateDatabase = async (req, res) => {
  try {
    const search_params = {
      sort_by: "most_recent",
      min_price: 0,
      limit: 50,
    };
    // Captura os parâmetros do JSON enviado

    const url = new URL("https://csfloat.com/api/v1/listings");

    if (search_params.sort_by) {
      url.searchParams.append("sort_by", search_params.sort_by);
    }
    if (search_params.min_price) {
      url.searchParams.append("min_price", search_params.min_price);
    }
    if (search_params.max_price) {
      url.searchParams.append("max_price", search_params.max_price);
    }

    const resposta = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${process.env.CSFLOAT_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!resposta.ok) {
      throw new Error(
        `Erro na requisição: ${resposta.status} ${resposta.statusText}`
      );
    }

    const dados = await resposta.json();

    dados.data.forEach(async (listing) => {
      const listingOnDB = await Item.findOne({
        where: { listingId: listing.id },
      });
      if (listingOnDB === null) {
        const item = listing.item;
        try {
          Item.create({
            listingId: listing.id,
            price: listing.price,
            icon_url: item.icon_url,
            market_hash_name: item.market_hash_name,
            inspect_link: item.inspect_link,
            type: item.type,
            rarity_name: item.rarity_name,
            wear_name: item.wear_name,
            is_stattrak: item.is_stattrak,
            is_souvenir: item.is_souvenir,
            float: item.float_value,
          });
        } catch (error) {}
      }
    });
  } catch (erro) {
    console.error("Erro ao buscar dados:", erro);
  }
};

const getItems = async (req, res) => {
  try {
    const { page } = req.body;
    const pageSize = 40;
    const offset = (page - 1) * pageSize;
    const items = await Item.findAll({
      limit: pageSize,
      offset: offset,
    });
    const formatedListing = items.map((listing) => ({
      listingId: listing.listingId,
      state: listing.state,
      price: listing.price,
      seller: listing.seller,
      item: {
        type: listing.type,
        rarity_name: listing.rarity_name,
        wear_name: listing.wear_name,
        is_stattrak: listing.is_stattrak,
        is_souvenir: listing.is_souvenir,
        market_hash_name: listing.market_hash_name,
        paint_seed: listing.paint_seed,
        float: listing.float,
        icon_url: listing.icon_url,
      },
    }));
    res.json({ data: formatedListing, page: page, offset: offset });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os itens!" });
  }
};

module.exports = { updateDatabase, getItems };
