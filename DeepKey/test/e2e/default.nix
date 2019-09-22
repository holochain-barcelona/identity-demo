{ pkgs }:
let
  name = "dk-test-e2e";

  script = pkgs.writeShellScriptBin name
  ''
   # Build DeepKey, install test JS dependencies, and run Diorama tests
   hf-install \
   && ( cd test && npm install ) \
   && RUST_BACKTRACE=1 hc test \
       | test/node_modules/faucet/bin/cmd.js
  '';
in
{
 buildInputs = [ script ];
}
