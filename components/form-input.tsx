import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, View } from "react-native";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?: any;
}

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
  autoComplete,
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className="gap-2">
          <Label nativeID={name}>{label}</Label>
          <View className={error ? "border border-destructive rounded-md" : ""}>
            <Input
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              autoComplete={autoComplete}
              className="bg-primary"
            />
            {error && (
              <Text className="text-sm text-destructive">{error.message}</Text>
            )}
          </View>
        </View>
      )}
    />
  );
}
