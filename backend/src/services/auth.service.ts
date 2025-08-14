import { UserRepository } from '../repositories/user.repository';
import { comparePassword, hashPassword } from '../utils/hash';
import { signToken } from '../utils/jwt';

export class AuthService {
  private userRepo = new UserRepository();

  async register(username: string, email: string, password: string, role: string = 'user') {
    // Validaciones de username
    if (!username || username.trim().length < 4) {
      throw new Error('El username debe tener al menos 4 caracteres');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error('El username solo puede contener letras, números y guiones bajos');
    }

    // Validaciones de email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('El email proporcionado no es válido');
    }

    // Validaciones de password
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear el usuario
    const newUser = {
      username,
      email,
      password: hashedPassword,
      role
    };

    const userId = await this.userRepo.create(newUser);
    return this.userRepo.findById(userId);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error('Contraseña incorrecta');

    const token = signToken({ id: user.id, role: user.role });
    return { token, user: { ...user, password: undefined } };
  }
}
