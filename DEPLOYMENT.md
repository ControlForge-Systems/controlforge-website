# ControlForge Website - Deployment Guide

## Quick Deployment

### 1. Pre-deployment Validation
```bash
pnpm validate
# or 
./scripts/pre-deployment-check.sh
```

### 2. Deploy to Production
```bash
pnpm prod:deploy
```

## Detailed Steps

### Development
1. Make your changes
2. Test locally: `pnpm dev`
3. Run checks: `pnpm check`
4. Format code: `pnpm format`

### Pre-deployment
1. **Build validation**: `pnpm build`
2. **Run validation script**: `pnpm validate`
3. **Review checklist**: Check `PRODUCTION_CHECKLIST.md`
4. **Test preview**: `pnpm preview`

### Production Deployment
1. **Deploy**: `pnpm prod:deploy`
   - This runs: `pnpm prod:build` (prebuild + build)
   - Copies files via rsync to homelab server
   - Restarts the website service

### Post-deployment
1. **Verify site**: Visit https://controlforge.dev
2. **Check functionality**: Test all major features
3. **Monitor logs**: Check for any errors
4. **Update changelog**: Document what was deployed

## Files Deployed

The deployment copies these files/directories to production:
- `build/***` - All built static files
- `prod.compose.yml` - Service configuration
- `nginx/***` - Nginx configuration

## Rollback Procedure

If issues occur:
1. **Quick rollback**: Restart previous service
   ```bash
   ssh homelab 'cd ~/ssd-2tb/apps/controlforge-website && docker compose -f prod.compose.yml down && docker compose -f prod.compose.yml up -d'
   ```

2. **Full rollback**: Deploy previous Git commit
   ```bash
   git checkout <previous-commit>
   pnpm prod:deploy
   git checkout main
   ```

## Monitoring

- **Site health**: https://controlforge.dev/nginx-health
- **Service status**: `ssh homelab 'docker ps | grep controlforge'`
- **Logs**: `ssh homelab 'docker logs controlforge-website'`

## Emergency Contacts

- **Developer**: Michael (primary maintainer)
- **Infrastructure**: homelab server
- **Domain**: [Your DNS provider]

---

**Last Updated**: June 16, 2025
