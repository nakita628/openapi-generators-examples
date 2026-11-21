"""The type check every app runs: `tsc -p tsconfig.json` over its generated sources."""

load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@npm//:typescript/package_json.bzl", typescript = "bin")

def typecheck(name = "typecheck", size = "medium", **kwargs):
    """Links the app's node_modules and type-checks every `<spec>/src/**/*.ts`.

    Args:
        name: the test target.
        size: the test size; a large spec may need "large".
        **kwargs: passed to the tsc_test.
    """
    npm_link_all_packages(name = "node_modules")

    js_library(
        name = "srcs",
        srcs = ["package.json", "tsconfig.json"] + native.glob(["*/src/**/*.ts"]),
    )

    typescript.tsc_test(
        name = name,
        size = size,
        args = ["-p", "tsconfig.json"],
        chdir = native.package_name(),
        data = [
            ":srcs",
            ":node_modules",
            "//:tsconfig_base",
        ],
        **kwargs
    )
