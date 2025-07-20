.PHONY: help install dev build test test-watch test-coverage clean db-setup db-migrate db-generate db-seed start

# Default target
.DEFAULT_GOAL := help

# Help target
help: ## Show this help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# Installation targets
install: ## Install all dependencies (root, frontend, backend)
	npm install
	cd src/frontend && npm install
	cd src/backend && npm install

# Development targets
dev: ## Start both frontend and backend servers concurrently
	npm run dev

dev-frontend: ## Start only frontend development server
	cd src/frontend && npm run dev

dev-backend: ## Start only backend development server
	cd src/backend && npm run dev

# Build targets
build: ## Build frontend for production
	cd src/frontend && npm run build

# Test targets
test: ## Run backend tests
	cd src/backend && npm run test

test-watch: ## Run backend tests in watch mode
	cd src/backend && npm run test:watch

test-coverage: ## Run backend tests with coverage
	cd src/backend && npm run test:coverage

# Database targets
db-setup: db-generate db-migrate db-seed ## Setup database (generate, migrate, seed)

db-migrate: ## Run database migrations
	cd src/backend && npm run db:migrate

db-generate: ## Generate Prisma client
	cd src/backend && npm run db:generate

db-seed: ## Seed database with sample data
	cd src/backend && npm run db:seed

prisma-generate: ## Generate Prisma schema from OpenAPI
	cd src/backend && npm run prisma:generate

# Server targets
start: ## Start production server
	cd src/backend && npm start

# Utility targets
clean: ## Clean node_modules and build artifacts
	rm -rf node_modules
	rm -rf src/frontend/node_modules
	rm -rf src/backend/node_modules
	rm -rf src/frontend/dist
	rm -rf src/backend/coverage

# Development workflow shortcuts
setup: install db-setup ## Initial project setup (install + database setup)

reset: clean install db-setup ## Reset project (clean + install + database setup)

dev-full: setup dev ## Full development setup and start