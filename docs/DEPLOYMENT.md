# Production Deployment Guide

> 🚀 Procedures for deploying the ControlForge website to production

## 🚨 Pre-Deployment Requirements

**⚠️ ALWAYS complete these steps before deployment:**

1. **✅ Production Checklist**: Complete `PRODUCTION_CHECKLIST.md`
2. **✅ Code Quality**: All tests pass and linting is clean
3. **✅ Build Validation**: Local build succeeds without errors
4. **✅ Preview Testing**: Test with `pnpm preview`

---

## ⚡ Quick Deployment

```bash
# 1. Validate everything
pnpm validate

# 2. Deploy to production
pnpm prod:deploy
```

---

## 📋 Deployment Process

### 1. Development Validation

```bash
# Test locally
pnpm dev

# Code quality checks
pnpm check        # TypeScript checking
pnpm lint         # ESLint validation
pnpm format       # Prettier formatting

# Build validation
pnpm build        # Verify build succeeds
pnpm preview      # Test production build locally
```

### 2. Pre-Deployment Validation

```bash
# Run comprehensive validation
pnpm validate

# Manual validation script
./scripts/pre-deployment-check.sh

# Complete production checklist
# Review: docs/PRODUCTION_CHECKLIST.md
```

### 3. Production Deployment

```bash
# Deploy with automatic build and transfer
pnpm prod:deploy
```

**This command:**

1. Builds optimized production bundle
2. Transfers files to server via rsync
3. Restarts Docker service
4. Verifies deployment

### 4. Post-Deployment Verification

```bash
# Verify site is live
curl -I https://controlforge.dev

# Test critical functionality:
# - Homepage loads correctly
# - VS Code demo works
# - Documentation pages accessible
# - Installation buttons functional
```

---

## 🔧 Deployment Configuration

### Files Deployed

- `build/` - Static site files
- `prod.compose.yml` - Docker configuration
- `nginx/` - Nginx configuration

### Infrastructure

- **Server**: Docker + Nginx
- **SSL**: Automatic HTTPS
- **Deployment**: Rsync file transfer

---

## 🔄 Rollback Procedures

### Service Issues

```bash
# Restart current service
ssh homelab 'cd ~/ssd-2tb/apps/michael/controlforge-website && docker compose -f prod.compose.yml restart'
```

### Code Issues

```bash
# 1. Checkout previous working commit
git checkout <previous-commit-hash>

# 2. Deploy previous version
pnpm prod:deploy

# 3. Return to main branch
git checkout main
```

---

## 📊 Monitoring

### Health Checks

```bash
# Site availability
curl -f https://controlforge.dev

# Service status
ssh homelab 'docker ps | grep controlforge-website'
```

### Manual Verification

- [ ] Homepage loads without errors
- [ ] VS Code demo functions properly
- [ ] Documentation pages accessible
- [ ] Installation buttons work
- [ ] Mobile responsiveness
- [ ] SSL certificate valid

---

_Follow this guide for all production deployments. Always complete the production checklist before deploying._
