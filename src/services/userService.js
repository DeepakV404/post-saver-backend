import pool from '../config/database.js';
import { User, CreateUserSchema, UpdateUserSchema } from '../models/User.js';

const mapRowToUser = (row) => new User({
    id: row.id,
    email: row.email,
    password_hash: row.password_hash,
    display_name: row.display_name,
    avatar_url: row.avatar_url,
    role: row.role,
    status: row.status,
    provider: row.provider,
    provider_id: row.provider_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    last_login_at: row.last_login_at
});

const userService = {
    async listUsers() {
        const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
        return rows.map(mapRowToUser).map((u) => u.toJSON());
    },

    async getUserById(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (rows.length === 0) return null;
        return mapRowToUser(rows[0]).toJSON();
    },

    async getUserByEmail(email) {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) return null;
        return mapRowToUser(rows[0]).toJSON();
    },

    async createUser(data) {
        const payload = CreateUserSchema.parse(data);
        const {
            email,
            password_hash = null,
            display_name = null,
            avatar_url = null,
            role = 'user',
            status = 'active',
            provider = 'password',
            provider_id = null
        } = payload;

        const insert = `
            INSERT INTO users (email, password_hash, display_name, avatar_url, role, status, provider, provider_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const { rows } = await pool.query(insert, [
            email, password_hash, display_name, avatar_url, role, status, provider, provider_id
        ]);
        return mapRowToUser(rows[0]).toJSON();
    },

    async updateUser(id, data) {
        const payload = UpdateUserSchema.parse(data);
        const fields = [];
        const values = [];
        let idx = 1;

        for (const [key, value] of Object.entries(payload)) {
            fields.push(`${key} = $${idx++}`);
            values.push(value);
        }
        if (fields.length === 0) {
            const existing = await this.getUserById(id);
            return existing;
        }
        values.push(id);
        const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
        const { rows } = await pool.query(sql, values);
        if (rows.length === 0) return null;
        return mapRowToUser(rows[0]).toJSON();
    },

    async deleteUser(id) {
        const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        return rowCount > 0;
    }
};

export default userService;
