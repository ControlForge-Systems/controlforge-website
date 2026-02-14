#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { compress } = require('brotli');

const BUILD_DIR = path.join(process.cwd(), 'build');
const EXTENSIONS = ['.html', '.js', '.css', '.json', '.svg', '.xml'];
const BROTLI_QUALITY = 11; // Max quality for static pre-compression
const MIN_SIZE = 100; // Skip files smaller than 100 bytes

function getAllFiles(dirPath, arrayOfFiles = []) {
	const files = fs.readdirSync(dirPath);

	files.forEach((file) => {
		const filePath = path.join(dirPath, file);
		if (fs.statSync(filePath).isDirectory()) {
			getAllFiles(filePath, arrayOfFiles);
		} else {
			arrayOfFiles.push(filePath);
		}
	});

	return arrayOfFiles;
}

function compressFile(filePath) {
	const ext = path.extname(filePath);
	if (!EXTENSIONS.includes(ext)) return null;

	try {
		const input = fs.readFileSync(filePath);

		// Skip tiny files
		if (input.length < MIN_SIZE) return null;

		const compressed = compress(input, {
			mode: 0, // Generic mode
			quality: BROTLI_QUALITY,
			lgwin: 22
		});

		if (!compressed) {
			console.error(`Failed to compress: ${filePath}`);
			return null;
		}

		const outputPath = `${filePath}.br`;
		fs.writeFileSync(outputPath, Buffer.from(compressed));

		const originalSize = input.length;
		const compressedSize = compressed.length;
		const savings = ((1 - compressedSize / originalSize) * 100).toFixed(1);

		return { filePath, originalSize, compressedSize, savings };
	} catch (err) {
		console.error(`Error compressing ${filePath}:`, err.message);
		return null;
	}
}

console.log('Compressing build artifacts with Brotli...\n');

const allFiles = getAllFiles(BUILD_DIR);
const results = [];
let totalOriginal = 0;
let totalCompressed = 0;

allFiles.forEach((filePath) => {
	const result = compressFile(filePath);
	if (result) {
		results.push(result);
		totalOriginal += result.originalSize;
		totalCompressed += result.compressedSize;
	}
});

console.log(`Compressed ${results.length} files:`);
results.forEach(({ filePath, originalSize, compressedSize, savings }) => {
	const relativePath = path.relative(BUILD_DIR, filePath);
	console.log(
		`  ${relativePath}: ${(originalSize / 1024).toFixed(1)}KB → ${(compressedSize / 1024).toFixed(1)}KB (${savings}% saved)`
	);
});

const totalSavings = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
console.log(
	`\nTotal: ${(totalOriginal / 1024).toFixed(1)}KB → ${(totalCompressed / 1024).toFixed(1)}KB (${totalSavings}% saved)`
);
