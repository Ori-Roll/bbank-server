### Parts Refactoring

Urgency levels - ! !! !!! (least to most urgent)

NOTE: !! and !!! needs to be addressed before any kind of release

# !! Change validators to zod

- install package
- create schemas based on prima schemas
- apply to req

# !! add logout process

# ! This uses helmet for headers, see what the policy should be and configure

- research

# ! This all needs to be HTTPS

- note: once it is https - change the session cookie to secure: true (commented out for noe)

# ! Lint - Make the build fail if TS types are wrong

- there is an issue with routes getting IReq and IRes - fix it

# !!! CLEANUPS

- package - connect-sqlite3 and one of the sessions
- many logs
- many other things!
