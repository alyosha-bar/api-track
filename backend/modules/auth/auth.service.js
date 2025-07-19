// import needed database, models etc
// similar to golang repository pattern - note to self

const pool = require("../../database/db")

const InsertUser = async (clerkUser) => {
    const user = clerkUser.data;

    const id = user.id;
    const email = user.email_addresses?.[0]?.email_address || null;
    const firstName = user.first_name || null;
    const lastName = user.last_name || null;

    const query = `
        INSERT INTO users (id, email, first_name, last_name)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING
    `;

    await pool.query(query, [id, email, firstName, lastName]);
};

module.exports = {
    InsertUser
}