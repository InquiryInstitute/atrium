# Spaces (Matrix)

Atrium supports **Matrix Spaces** (MSC1772) natively.

## What are Spaces?

- Spaces are special rooms that group other rooms (and optionally other spaces) into a hierarchy.
- Users can navigate by space and see a **space summary** (MSC2946) for the list of rooms/children.
- Rooms can appear in multiple spaces.
- Spaces can be public, invite-only, or private.

## In Atrium

- The same matrix-js-sdk client used for chat also exposes Spaces APIs.
- The UI will show a space tree or space switcher and load the space summary for the current space.
- Room list and navigation are space-aware (filter by current space, show hierarchy).

## References

- [Matrix Spaces (MSC1772)](https://github.com/matrix-org/matrix-spec-proposals/pull/1772)
- [Space summary API (MSC2946)](https://github.com/matrix-org/matrix-spec-proposals/pull/2946)
- matrix-js-sdk: space APIs are stable (no longer unstable prefixes).
