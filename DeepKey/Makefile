.PHONY: all test fmt clean tools tool_rust tool_fmt
# .PHONY: all test test-unit test-e2e install clean

#RUSTFLAGS += -D warnings -Z external-macro-backtrace -Z thinlto -C codegen-units=10 -C opt-level=z
RUSTFLAGS += -D warnings -Z external-macro-backtrace -Z thinlto -C codegen-units=10

SHELL = /usr/bin/env sh
RUST_VER_WANT = "rustc 1.38.0-nightly (69656fa4c 2019-07-13)"
RUST_TAG_WANT = "nightly-2019-07-14"
FMT_VER_WANT = "rustfmt 1.3.0-nightly (d334502 2019-06-09)"
CLP_VER_WANT = "clippy 0.0.212 (b029042 2019-07-12)"

ENV = RUSTFLAGS='$(RUSTFLAGS)' OPENSSL_STATIC='1' CARGO_BUILD_JOBS='$(shell nproc)' NUM_JOBS='$(shell nproc)' CARGO_INCREMENTAL='1'

all: test

test: tools
	$(ENV) cargo fmt -- --check
	$(ENV) cargo clippy -- \
		-A clippy::nursery -A clippy::style -A clippy::cargo \
		-A clippy::pedantic -A clippy::restriction \
		-D clippy::complexity -D clippy::perf -D clippy::correctness
		nix-shell --run dk-test

fmt: tools
	cargo fmt

clean:
	rm -rf zomes/dpki/code/target dist test/node_modules test/package-lock.json
	rm -rf zomes/dpki/code/Cargo.lock Cargo.lock .cargo target

tools: tool_rust tool_fmt tool_clippy

tool_rust:
	@if [ "$$(rustc --version 2>/dev/null || true)" != ${RUST_VER_WANT} ]; \
	then \
		echo "# Makefile # incorrect rust toolchain version"; \
		echo "# Makefile #   want:" ${RUST_VER_WANT}; \
		if rustup --version >/dev/null 2>&1; then \
			echo "# Makefile # found rustup, setting override"; \
			rustup override set ${RUST_TAG_WANT}; \
		else \
			echo "# Makefile # rustup not found, cannot install toolchain"; \
			exit 1; \
		fi \
	else \
		echo "# Makefile # rust toolchain ok:" ${RUST_VER_WANT}; \
	fi;

tool_fmt: tool_rust
	@if [ "$$(cargo fmt --version 2>/dev/null || true)" != ${FMT_VER_WANT} ]; \
	then \
		if rustup --version >/dev/null 2>&1; then \
			echo "# Makefile # installing rustfmt with rustup"; \
			rustup component add rustfmt-preview; \
		else \
			echo "# Makefile # rustup not found, cannot install rustfmt"; \
			exit 1; \
		fi; \
	else \
		echo "# Makefile # rustfmt ok:" ${FMT_VER_WANT}; \
	fi;

tool_clippy: tool_rust
	@if [ "$$(cargo clippy --version 2>/dev/null || true)" != ${CLP_VER_WANT} ]; \
	then \
		if rustup --version >/dev/null 2>&1; then \
			echo "# Makefile # installing clippy with rustup"; \
			rustup component add clippy-preview; \
		else \
			echo "# Makefile # rustup not found, cannot install rustfmt"; \
			exit 1; \
		fi; \
	else \
		echo "# Makefile # clippy ok:" ${CLP_VER_WANT}; \
	fi;
