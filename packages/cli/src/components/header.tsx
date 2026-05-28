export function Header () {
  return (
    <box justifyContent="center" alignItems="center">
        <box flexDirection="row" alignItems="center" justifyContent="center" gap={0.5}>
            <ascii-font font="tiny" text="Dark" color="gray" />
            <ascii-font font="tiny" text="Code" />
        </box>
    </box>
  );
}