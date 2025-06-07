


module.exports = {
  dialect: 'postgres',
  // Usar a URL completa de conexão quando a variável de ambiente estiver definida
  url: process.env.DATABASE_URL || 'postgresql://postgres:CZKkbzaJRRaBPjpJnulLbrxIThDhFpkx@maglev.proxy.rlwy.net:59335/railway',

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};


// // configuração do stripe
// STRIPE_SECRET_KEY='sk_test_51RHbMhQRFA5bTw4XQeuFsn3M70AbuRrkUEbBg9upBgUNPijaVBxxDXXgkydzkDs74k7xp2sf2omKBu23xluOHPPc00wHyqmuDa'


// module.exports = {
    
//     dialect: 'postgres',
//     host: 'localhost',
//     username: 'postgres',
//     password: 'postgres',
//     database: 'devburger',
//     port: 5432,

//     define: {
//         timestamps: true,
//         underscored: true,
//         underscoredAll: true,
//     },


// };