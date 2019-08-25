module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "meetupdb",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
