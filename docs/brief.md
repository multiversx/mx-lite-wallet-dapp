# Project Brief: MultiversX Lite Wallet DApp

## Executive Summary

The MultiversX Lite Wallet DApp is a React/TypeScript-based web application that provides a lightweight wallet interface for the MultiversX blockchain ecosystem. Built using modern web technologies and the MultiversX SDK suite, this application serves as a client-side wallet enabling users to manage their digital assets, perform transactions, and interact with decentralized applications (dApps) across multiple MultiversX networks.

**Project Status:** Development (Not Production Ready)  
**Version:** 3.0.0
**License:** GPL-3.0-or-later  
**Author:** MultiversX

## Project Overview

### Problem Statement

Users need a secure, accessible, and user-friendly way to interact with the MultiversX blockchain without requiring the installation of native applications or browser extensions. There's a demand for a web-based wallet that can handle multi-network operations, support various authentication methods, and provide seamless integration with external dApps.

### Solution Description

The MultiversX Lite Wallet DApp provides:

- **Multi-network Support**: Compatible with devnet, testnet, mainnet, and sovereign networks
- **File-based Authentication**: Supports PEM files and keystore files for secure login
- **Hook Integration System**: Allows external dApps to request authentication and transaction signing
- **Modern Web Architecture**: Built with React 18, TypeScript, and Vite for optimal performance
- **Comprehensive Testing**: Includes unit tests, E2E tests with Puppeteer and Playwright

### Target Audience

- MultiversX blockchain users seeking web-based wallet functionality
- dApp developers requiring wallet integration capabilities
- Developers building on MultiversX who need reference implementations
- Testing and development teams working with MultiversX networks

## Business Objectives

### Primary Goals

1. **User Accessibility**: Provide easy access to MultiversX blockchain functionality through web browsers
2. **Developer Integration**: Enable seamless dApp integration through standardized hook systems
3. **Network Flexibility**: Support all MultiversX network environments for development and production
4. **Security First**: Implement secure private key management without persistent storage
5. **Developer Experience**: Serve as a reference implementation for MultiversX dApp development

### Success Metrics

- User adoption rates across different networks
- Integration by external dApps using the hook system
- Transaction success rates and user retention
- Developer feedback and community contributions
- Security audit results and vulnerability assessments

## Technical Architecture

### Technology Stack

**Frontend Framework:**
- React 18.2.0 with TypeScript 5.2.2
- Vite 4.4.9 for build tooling and development server
- Tailwind CSS 3.3.3 for styling

**MultiversX SDK Integration:**
- @multiversx/sdk-core ^14.x
- @multiversx/sdk-dapp ^5.x
- @multiversx/sdk-dapp-form ^3.x
- @multiversx/sdk-dapp-ui ^0.x
- @multiversx/sdk-dapp-utils ^2.x

**State Management:**
- Redux Toolkit 1.9.1
- Redux Persist 6.0.0
- Reselect ^5.1.1

**Form Management & Validation:**
- Formik 2.4.6
- Yup 1.4.0

**Testing Framework:**
- Jest 29.7.0 for unit testing
- Puppeteer 22.11.1 for E2E testing
- Playwright 1.49.0 for additional E2E testing
- Testing Library suite for component testing

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Frontend (React/TypeScript)            │
├─────────────────────────────────────────────────────────────────┤
│  Pages          │  Components     │  Providers    │  Hooks      │
│  - Dashboard    │  - Layout       │  - Keystore   │  - Login    │
│  - Send         │  - FilePanel    │  - PEM        │  - Send     │
│  - Sign         │  - Forms        │  - Base       │  - Sign     │
│  - Hook/*       │  - UI Elements  │               │  - Hook     │
├─────────────────────────────────────────────────────────────────┤
│                       State Management (Redux)                  │
├─────────────────────────────────────────────────────────────────┤
│              MultiversX SDK Integration Layer                   │
├─────────────────────────────────────────────────────────────────┤
│  Network Configuration (Dynamic)                               │
│  - Devnet   │  - Testnet   │  - Mainnet   │  - Sovereign      │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components

**Authentication System:**
- File-based providers (PEM/Keystore)
- Private key management in memory only
- Re-authentication modals for security
- Hook-based external authentication

**Network Configuration System:**
- Dynamic config switching via build scripts
- Environment-specific API endpoints
- Network-aware transaction handling

**Transaction Management:**
- Transaction signing and broadcasting
- Status tracking and confirmation
- Fee estimation and validation
- Multi-transaction support

**Hook Integration:**
- Login hook (`/hook/login`)
- Sign transaction hook (`/hook/sign`)
- Sign message hook (`/hook/signMessage`)
- Logout hook (`/hook/logout`)

## Features & Functionality

### Core Features

1. **Multi-Network Wallet Operations**
   - Account balance and asset viewing
   - Transaction history
   - Token and NFT management
   - Cross-network compatibility

2. **Transaction Services**
   - EGLD transfers
   - ESDT token transfers
   - NFT transfers
   - Token/collection issuance
   - Smart contract interactions

3. **Security Features**
   - File-based authentication
   - Private key isolation
   - Session-based storage options
   - Secure transaction signing

4. **Developer Integration**
   - Hook-based dApp communication
   - PostMessage API support
   - Redirect-based workflows
   - Cross-window messaging

### Advanced Features

1. **Token Management**
   - Token registration
   - Collection creation
   - NFT minting
   - Metadata handling

2. **Testing & Development**
   - Faucet integration for test networks
   - Mock service worker support
   - Comprehensive test suites
   - Development mode features

3. **User Experience**
   - Responsive design
   - Intuitive navigation
   - Error handling and validation
   - Accessibility considerations

## Development & Deployment

### Development Environment

**Prerequisites:**
- Node.js >= 18
- npm >= 10
- Modern web browser

**Setup Process:**
1. Clone repository
2. Install dependencies: `npm install`
3. Configure network: Copy appropriate config file
4. Start development server: `npm run start-{network}`

### Build & Deployment

**Network-Specific Builds:**
```bash
npm run build-devnet    # Development network
npm run build-testnet   # Testing network
npm run build-mainnet   # Production network
npm run build-sovereign # Sovereign network
```

**Deployment Considerations:**
- Static asset hosting (CDN recommended)
- HTTPS requirement for security
- CORS configuration for API endpoints
- Environment variable management

### Testing Strategy

**Multi-Layer Testing Approach:**

1. **Unit Tests** (Jest + Testing Library)
   - Component functionality
   - Utility functions
   - Business logic validation

2. **Integration Tests** (Jest + jsdom)
   - Component interactions
   - State management flows
   - API integration

3. **E2E Tests** (Puppeteer + Playwright)
   - Full user workflows
   - Cross-browser compatibility
   - Network-specific scenarios

**Test Execution:**
```bash
npm test                    # Unit tests
npm run test-pptr-headless  # Headless E2E tests
npm run run-playwright      # Playwright tests
```

## Security Considerations

### Security Model

1. **Private Key Management**
   - No persistent storage of private keys
   - Memory-only key handling
   - Secure file parsing and validation

2. **Authentication Flow**
   - File-based authentication system
   - Re-authentication on page refresh
   - Session timeout handling

3. **Transaction Security**
   - Client-side transaction signing
   - Nonce management and validation
   - Gas estimation and limits

4. **Network Security**
   - HTTPS enforcement
   - API endpoint validation
   - Cross-origin request handling

### Risk Mitigation

- Regular security audits
- Dependency vulnerability scanning
- Secure coding practices
- Community review and feedback

## Project Structure

### Directory Organization

```
src/
├── components/          # Reusable UI components
├── pages/              # Application pages/routes
├── providers/          # Authentication providers
├── hooks/              # Custom React hooks
├── redux/              # State management
├── config/             # Network configurations
├── lib/                # SDK wrappers and utilities
├── utils/              # Helper functions
├── types/              # TypeScript definitions
└── styles/             # Global styles
```

### Code Organization Principles

- One component per file
- Components in named folders with index.tsx
- Subcomponents in components/ subfolder
- Types in types.ts files
- Utilities in utils/ folders
- Comprehensive test coverage

## Roadmap & Future Enhancements

### Phase 1: Stabilization (Current)
- Bug fixes and stability improvements
- Security audit and hardening
- Performance optimization
- Documentation enhancement

### Phase 2: Feature Enhancement
- Additional authentication methods
- Enhanced UI/UX improvements
- Mobile optimization
- Advanced transaction features

### Phase 3: Ecosystem Integration
- Hardware wallet support
- DeFi protocol integration
- Cross-chain functionality
- Advanced developer tools

### Phase 4: Production Readiness
- Security certifications
- Performance benchmarking
- Scalability improvements
- Enterprise features

## Contributing & Community

### Development Workflow

1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Submit pull request
5. Code review and integration

### Contribution Guidelines

- Follow TypeScript best practices
- Maintain comprehensive test coverage
- Adhere to existing code structure
- Update documentation as needed
- Security-first approach

### Community Engagement

- GitHub issues for bug reports
- Feature requests and discussions
- Code review participation
- Documentation improvements

## Conclusion

The MultiversX Lite Wallet DApp represents a comprehensive solution for web-based blockchain interaction within the MultiversX ecosystem. With its robust architecture, security-first approach, and developer-friendly integration capabilities, it serves as both a functional wallet application and a reference implementation for MultiversX dApp development.

The project's current development status reflects its position as an evolving solution that balances functionality, security, and developer experience while maintaining the flexibility to adapt to the growing MultiversX ecosystem needs.

---

**Document Version:** 1.0  
**Last Updated:** 2025-08-08  
**Next Review:** TBD