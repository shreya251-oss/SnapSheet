# Contributing to SnapSheet

Thank you for your interest in contributing to SnapSheet! This document provides guidelines for contributing to this AI-powered OCR tool.

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/shreya251-oss/SnapSheet.git
   cd SnapSheet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Gemini API key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Ensure mobile-first responsive design
- Add proper TypeScript types

### Component Guidelines
- Keep components small and focused
- Use proper prop types
- Include accessibility attributes
- Follow the existing design system
- Add proper error handling

### API Guidelines
- Validate all inputs
- Handle errors gracefully
- Include proper HTTP status codes
- Add rate limiting where appropriate
- Document API changes

## 🧪 Testing

Before submitting a PR:
- Test on multiple devices and browsers
- Verify OCR accuracy with various image types
- Check accessibility with screen readers
- Ensure proper error handling
- Test both light and dark themes

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding guidelines
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear description
   - Include screenshots for UI changes
   - Reference any related issues

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information
- Screenshots if applicable

## 💡 Feature Requests

For feature requests:
- Describe the problem you're solving
- Explain your proposed solution
- Consider the impact on existing users
- Provide mockups for UI changes

## 📚 Documentation

Help improve documentation by:
- Fixing typos and grammar
- Adding examples
- Improving clarity
- Updating outdated information

## 🏷️ Commit Message Format

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Be respectful and constructive in discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Maintained by Shreya** | [GitHub](https://github.com/shreya251-oss) | [Issues](https://github.com/shreya251-oss/SnapSheet/issues)